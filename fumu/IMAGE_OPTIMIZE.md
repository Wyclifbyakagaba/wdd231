Image optimization guide — generate WebP versions

Use these commands in the project root to generate WebP images from SVG/PNG/JPG.

Using cwebp (recommended):

Windows (PowerShell):

1. Install WebP tools: https://developers.google.com/speed/webp/download
2. Convert a file:

   cwebp images/member-kampala-academy.svg -q 75 -o images/member-kampala-academy.webp

Batch convert all member-*.svg to WebP:

   Get-ChildItem images\member-*.svg | ForEach-Object { & cwebp $_.FullName -q 75 -o ($_.FullName -replace '\.svg$','.webp') }

Using ImageMagick (if installed):

   magick convert images/member-kampala-academy.svg -quality 75 images/member-kampala-academy.webp

After generating WebP files, update `data/members.json` image extensions or rely on `srcset` in the templates which prefer `.webp` when available.
