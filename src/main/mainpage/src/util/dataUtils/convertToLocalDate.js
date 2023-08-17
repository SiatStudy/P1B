export const convertToLocalDate = (jsonFromBackend) => {
    const parsedData = JSON.parse(jsonFromBackend);

    const year = parsedData.year;
    const month = parsedData.monthValue - 1;
    const day = parsedData.dayOfMonth;
    const hour = parsedData.hour;
    const minute = parsedData.minute;
    const second = parsedData.second;

    const newDate = new Date(year, month, day, hour, minute, second);

    return newDate;
}