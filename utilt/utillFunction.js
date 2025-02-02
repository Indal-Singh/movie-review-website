module.exports.utilFunction = {
    formatDate: (dateString) => {
        const date = new Date(dateString);

        // Use `toLocaleDateString` to format the date in a human-readable way
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',  // Full month name
            day: 'numeric'
        });
        return formattedDate
    }

}