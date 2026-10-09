Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Tanisha\.gemini\antigravity\brain\93c98d7d-a36f-4495-94b8-3bb6ecac437c\.user_uploaded\media_1791528058406.jpg"
$outDir = "D:\Website design\Graphity tshirt brand\public\images\products\cyber-dissolution-digital-art-tee"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)

# 1. FRONT VIEW: X=0..512, Y=0..605
$rectFront = New-Object System.Drawing.Rectangle(0, 0, 512, 605)
$bmpFront = $src.Clone($rectFront, $src.PixelFormat)
$bmpFront.Save((Join-Path $outDir "front.jpg"), $codec, $encoderParams)
$bmpFront.Dispose()
Write-Host "front.jpg saved (512x605)"

# 2. BACK VIEW: X=512..1024, Y=0..605
$rectBack = New-Object System.Drawing.Rectangle(512, 0, 512, 605)
$bmpBack = $src.Clone($rectBack, $src.PixelFormat)
$bmpBack.Save((Join-Path $outDir "back.jpg"), $codec, $encoderParams)
$bmpBack.Dispose()
Write-Host "back.jpg saved (512x605)"

# 3. DETAILS STRIP: X=0..1024, Y=605..935 (Height = 330)
$rectDet = New-Object System.Drawing.Rectangle(0, 605, 1024, 935 - 605)
$bmpDet = $src.Clone($rectDet, $src.PixelFormat)
$bmpDet.Save((Join-Path $outDir "details.jpg"), $codec, $encoderParams)
$bmpDet.Dispose()
Write-Host "details.jpg saved (1024x330)"

# 4. FULL MASTER LOOKBOOK
$src.Save((Join-Path $outDir "lookbook.jpg"), $codec, $encoderParams)
Write-Host "lookbook.jpg saved (1024x935)"

$src.Dispose()
Write-Host "All assets generated!"
