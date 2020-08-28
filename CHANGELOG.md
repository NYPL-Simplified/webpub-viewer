# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

========
## [0.2.0]
### Adds
- Adds Access Control for epubs
- Preloads epubs and stores them in browser storage
- If an encrypted epub is loaded without appropriate crypto functions, an error page appears.

### Bugfixes
- Updates Page navigation buttons to be hidden when TOS is visible

## [0.1.3]
- Require URL, label, ariaLabel and libraryIcon URL(new) to be passed into wepub-viewer upLink for navigation.  
- Wrap upLabel in URL.

## [0.1.2]

- Add initial support to extract Manifest information from local Package Documents (OEBPS package files) in addition to remote container.xml and *.opf urls.
- Save exploded EPubs to local storage and render in webpub-viewer from local storage in order to render remote EPubs in IFrame without CORS issues.

## [0.1.1]

- Exports `webpub-viewer` as an ES6 module

## [0.1.0]

- Starting a changelog
