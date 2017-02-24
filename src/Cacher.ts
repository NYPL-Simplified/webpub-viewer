import Manifest from "./Manifest";

interface Cacher {
    getManifest(manifestUrl: URL): Promise<Manifest>;
    renderStatus(element: HTMLElement): Promise<void>;
}

export default Cacher;