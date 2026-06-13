package main

import (
    "database/sql"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/gin-gonic/gin"
    _ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
    r := gin.Default()

    db := initDB()
    if db != nil {
        defer db.Close()
    }

    r.GET("/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "ok"})
    })

    r.GET("/api/lessons", func(c *gin.Context) {
        // In the real app this will query Postgres. Return a small stub for now.
        lessons := []gin.H{
            {"slug": "intervals", "title": "Intervals"},
            {"slug": "major-scales", "title": "Major Scales"},
            {"slug": "triads", "title": "Triads"},
        }
        c.JSON(http.StatusOK, lessons)
    })

    r.GET("/api/lessons/:slug", func(c *gin.Context) {
        slug := c.Param("slug")
        // stubbed response
        c.JSON(http.StatusOK, gin.H{"slug": slug, "title": "Lesson: " + slug})
    })

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    srv := &http.Server{
        Addr:    ":" + port,
        Handler: r,
    }

    log.Printf("starting backend on %s", srv.Addr)
    if err := srv.ListenAndServe(); err != nil {
        log.Fatal(err)
    }
}

func initDB() *sql.DB {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        log.Print("DATABASE_URL not set, skipping DB init")
        return nil
    }

    db, err := sql.Open("pgx", dsn)
    if err != nil {
        log.Printf("db open error: %v", err)
        return nil
    }

    db.SetConnMaxLifetime(time.Minute * 5)
    db.SetMaxOpenConns(10)
    db.SetMaxIdleConns(5)

    if err := db.Ping(); err != nil {
        log.Printf("db ping error: %v", err)
        return nil
    }

    log.Print("connected to database")
    return db
}
