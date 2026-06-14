import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ExerciseAudioFooter from "./ExerciseAudioFooter";

describe("ExerciseAudioFooter", () => {
  const playMock = vi.fn().mockResolvedValue(undefined);
  const pauseMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("Audio", vi.fn().mockImplementation(() => ({
      play: playMock,
      pause: pauseMock,
      currentTime: 0,
      volume: 0,
      preload: "auto",
      onended: () => {},
    })));
    playMock.mockReset();
    pauseMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("disables play when no audio source is provided", () => {
    render(<ExerciseAudioFooter />);

    expect(screen.getByRole("button", { name: /play/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /stop/i })).toBeDisabled();
  });

  it("plays audio and updates state when audioSrc exists", async () => {
    render(<ExerciseAudioFooter audioSrc="/audio/pianoFourBarExample.mp3" />);

    const playButton = screen.getByRole("button", { name: /play/i });
    const stopButton = screen.getByRole("button", { name: /stop/i });

    expect(playButton).toBeEnabled();
    expect(stopButton).toBeDisabled();

    fireEvent.click(playButton);

    await waitFor(() => expect(playMock).toHaveBeenCalled());
    expect(screen.getByText(/Playing recorded audio/i)).toBeInTheDocument();

    fireEvent.click(stopButton);
    expect(pauseMock).toHaveBeenCalled();
    expect(screen.getByText(/Stopped/i)).toBeInTheDocument();
  });
});
