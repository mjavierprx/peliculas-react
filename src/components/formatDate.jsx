function FormatDate(props) {
    let date = new Date(props.date);
    let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export default FormatDate;