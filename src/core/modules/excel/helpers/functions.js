export default function getExcelListFromStorage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = Object
          .keys(localStorage)
          .filter(key => key.includes('excel:'))
          .map(key => {
            const parsed = JSON.parse(localStorage.getItem(key))
            return {
              title: parsed.title,
              date: parsed.date,
              hash: key.split('excel:')[1]
            }
          })
      resolve(result)
    }, 1000)
  })
}

