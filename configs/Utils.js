import mime from "mime"


export const processImagePicker = (image) => {
    let newImage = 'file:///' + image.uri.split('file:/').join('')
    return {
        uri: newImage,
        type: mime.getType(newImage),
        name: newImage.split('/').pop()
    }
}

export const formattedNumber = (number) => number.toLocaleString('de-DE', {
    minimumFractionDigits: 2,  // Số chữ số thập phân tối thiểu
    maximumFractionDigits: 2   // Số chữ số thập phân tối đa
})