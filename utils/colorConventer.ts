

const colorConventer = (col: string, opacity: number) => {
    const red = parseInt(col.substring(1,3), 16)
    const green = parseInt(col.substring(3,5), 16)
    const blue = parseInt(col.substring(5,7), 16)

    const rgba = `rgba(${red}, ${green}, ${blue},${opacity})`
    return rgba;
}

export default colorConventer;