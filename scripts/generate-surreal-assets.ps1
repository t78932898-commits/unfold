Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("C:\Users\Tanisha\.gemini\antigravity\brain\93c98d7d-a36f-4495-94b8-3bb6ecac437c\.user_uploaded\media_1791440663018.jpg")
$outDir = "D:\Website design\Graphity tshirt brand\public\images\products\surreal-horizon-abstract-tee"

function SaveJpeg($bmp, $path, $quality = 98) {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($path, $codec, $encoderParams)
    $encoderParams.Dispose()
}

# 1. FRONT VIEW: X=0..434, Y=0..682
$rectFront = New-Object System.Drawing.Rectangle(0, 0, 434, 682)
$bmpFront = $src.Clone($rectFront, $src.PixelFormat)
SaveJpeg $bmpFront (Join-Path $outDir "front.jpg") 98
$bmpFront.Dispose()
Write-Host "front.jpg saved (434x682, Q=98)"

# 2. BACK VIEW: X=441..845, Y=0..682 (width = 404)
$rectBack = New-Object System.Drawing.Rectangle(441, 0, 404, 682)
$bmpBack = $src.Clone($rectBack, $src.PixelFormat)
SaveJpeg $bmpBack (Join-Path $outDir "back.jpg") 98
$bmpBack.Dispose()
Write-Host "back.jpg saved (404x682, Q=98)"

# 3. DETAILS: High-fidelity painterly print detail (Card 3: X=853..1000, Y=390..560)
$rectDet = New-Object System.Drawing.Rectangle(853, 390, 147, 170)
$bmpDet = $src.Clone($rectDet, $src.PixelFormat)
SaveJpeg $bmpDet (Join-Path $outDir "details.jpg") 98
$bmpDet.Dispose()
Write-Host "details.jpg saved (147x170, Q=98)"

# 4. LOOKBOOK / FULL POSTER:
SaveJpeg $src (Join-Path $outDir "lookbook.jpg") 98
Write-Host "lookbook.jpg saved (1024x682, Q=98)"

# Clean up test files
Remove-Item -Path (Join-Path $outDir "test_*.jpg") -ErrorAction SilentlyContinue

$src.Dispose()
Write-Host "All production assets successfully created!"
