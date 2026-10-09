Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Tanisha\.gemini\antigravity\brain\93c98d7d-a36f-4495-94b8-3bb6ecac437c\.user_uploaded\media_1791530581093.jpg"
$outDir = "D:\Website design\Graphity tshirt brand\public\images\products\1988-tokyo-midnight-racer-vintage-tee"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)

# 1. FRONT VIEW: X=0..512, Y=0..618
$rectFront = New-Object System.Drawing.Rectangle(0, 0, 512, 618)
$bmpFront = $src.Clone($rectFront, $src.PixelFormat)
$bmpFront.Save((Join-Path $outDir "front.jpg"), $codec, $encoderParams)
$bmpFront.Dispose()
Write-Host "front.jpg saved (512x618)"

# 2. BACK VIEW: X=512..1024, Y=0..618 (Width = 512)
$rectBack = New-Object System.Drawing.Rectangle(512, 0, 512, 618)
$bmpBack = $src.Clone($rectBack, $src.PixelFormat)
$bmpBack.Save((Join-Path $outDir "back.jpg"), $codec, $encoderParams)
$bmpBack.Dispose()
Write-Host "back.jpg saved (512x618)"

# 3. DETAILS STRIP: X=0..1024, Y=618..935 (Height = 317)
$rectDet = New-Object System.Drawing.Rectangle(0, 618, 1024, 317)
$bmpDet = $src.Clone($rectDet, $src.PixelFormat)
$bmpDet.Save((Join-Path $outDir "details.jpg"), $codec, $encoderParams)
$bmpDet.Dispose()
Write-Host "details.jpg saved (1024x317)"

# 4. MASTER LOOKBOOK POSTER
$src.Save((Join-Path $outDir "lookbook.jpg"), $codec, $encoderParams)
Write-Host "lookbook.jpg saved (1024x935)"

$src.Dispose()
Write-Host "All assets generated!"
