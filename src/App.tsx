import React, { useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import MyEditor from './Editor'

const ImageCropper: React.FC = () => {
	const [crop, setCrop] = useState<Crop>({
		unit: 'px',
		x: 0,
		y: 0,
		width: 360,
		height: 143,
	})

	const [src, setSrc] = useState<string | null>(null)
	const [output, setOutput] = useState<string | null>(null)
	const imageRef = useRef<HTMLImageElement | null>(null)

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setSrc(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const cropImageNow = () => {
		if (imageRef.current && crop.width && crop.height) {
			const canvas = document.createElement('canvas')
			const scaleX = imageRef.current.naturalWidth / imageRef.current.width
			const scaleY = imageRef.current.naturalHeight / imageRef.current.height
			canvas.width = crop.width
			canvas.height = crop.height
			const ctx = canvas.getContext('2d')

			if (ctx) {
				const pixelRatio = window.devicePixelRatio
				canvas.width = crop.width * pixelRatio
				canvas.height = crop.height * pixelRatio
				ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
				ctx.imageSmoothingQuality = 'high'

				ctx.drawImage(imageRef.current, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height)

				// Converting to base64
				const base64Image = canvas.toDataURL('image/jpeg')
				setOutput(base64Image)
			}
		}
	}

	return (
		<div>
			<input type="file" accept="image/*" onChange={handleImageUpload} />
			{src && (
				<>
					<ReactCrop crop={crop} onChange={setCrop} locked={true} keepSelection={true} aspect={360 / 143}>
						<img src={src} alt="Source" ref={imageRef} width={500} height={500} />
					</ReactCrop>
					<button onClick={cropImageNow}>Crop</button>
				</>
			)}

			<div>{output && <img src={output} alt="Cropped" />}</div>

			<br />
			<br />
			<br />
			<MyEditor />
		</div>
	)
}

export default ImageCropper
