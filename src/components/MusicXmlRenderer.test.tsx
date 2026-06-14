import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import MusicXmlRenderer from "./MusicXmlRenderer";

const loadMock = vi.fn();
const renderMock = vi.fn();

vi.mock("opensheetmusicdisplay", () => ({
  OpenSheetMusicDisplay: vi.fn().mockImplementation(() => ({
    load: loadMock,
    render: renderMock,
    clear: vi.fn(),
  })),
}));

describe("MusicXmlRenderer", () => {
  beforeEach(() => {
    loadMock.mockReset();
    renderMock.mockReset();
  });

  it("loads and renders sheet music", async () => {
    loadMock.mockResolvedValue(undefined);

    render(<MusicXmlRenderer xml="<score-partwise></score-partwise>" />);

    await waitFor(() => expect(loadMock).toHaveBeenCalled());
    await waitFor(() => expect(renderMock).toHaveBeenCalled());

    expect(screen.queryByText(/Loading sheet music/i)).not.toBeInTheDocument();
  });

  it("shows an error when load fails", async () => {
    loadMock.mockRejectedValue(new Error("load failed"));

    render(<MusicXmlRenderer xml="<score-partwise></score-partwise>" />);

    await screen.findByText(/Unable to render MusicXML/i);
  });
});
