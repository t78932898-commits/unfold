Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Tanisha\.gemini\antigravity\brain\93c98d7d-a36f-4495-94b8-3bb6ecac437c\.user_uploaded\media_1791443785279.jpg"
$outDir = "D:\Website design\Graphity tshirt brand\public\images\products\do-not-disturb-my-peace-tee"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

function SaveJpeg($bmp, $path, $quality = 98) {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($path, $codec, $encoderParams)
    $encoderParams.Dispose()
}

# 1. FRONT CROP: X=0..456, Y=0..682
$rectFront = New-Object System.Drawing.Rectangle(0, 0, 456, 682)
$bmpFront = $src.Clone($rectFront, $src.PixelFormat)
SaveJpeg $bmpFront (Join-Path $outDir "front.jpg") 98
$bmpFront.Dispose()
Write-Host "front.jpg saved"

# 2. BACK CROP: X=457..835, Y=0..682 (width = 378)
$rectBack = New-Object System.Drawing.Rectangle(457, 0, 378, 682)
$bmpBack = $src.Clone($rectBack, $src.PixelFormat)
SaveJpeg $bmpBack (Join-Path $outDir "back.jpg") 98
$bmpBack.Dispose()
Write-Host "back.jpg saved"

# 3. DETAILS COLUMN: X=835..1024, Y=0..682 (width = 189)
$rectDet = New-Object System.Drawing.Rectangle(835, 0, 189, 682)
$bmpDet = $src.Clone($rectDet, $src.PixelFormat)
SaveJpeg $bmpDet (Join-Path $outDir "details.jpg") 98
$bmpDet.Dispose()
Write-Host "details.jpg saved"

# 4. FULL LOOKBOOK POSTER
SaveJpeg $src (Join-Path $outDir "lookbook.jpg") 98
Write-Host "lookbook.jpg saved"

$src.Dispose()
Write-Host "All assets generated successfully!"
