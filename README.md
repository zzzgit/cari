# cari

A command line dictionary based on Node.js.

## Dictionary Adapters

This project includes three dictionary adapters located in `bin/dict/`:

| Adapter | Status |
|---------|--------|
| **YoudaoDictionary** (Youdao) | ✅ Working |
| **DictDictionary** (Dict) | ✅ Working |
| **AhdDictionary** (American Heritage) | ✅ Working |

> **Note:** **BingDictionary** and **MerriamWebsterDictionary** have been removed.
> - **Bing** — The Bing Dictionary page was fully redesigned with client-side rendering, making server-side scraping no longer feasible.
> - **Merriam-Webster** — The site is protected by Cloudflare, which blocks automated requests.
