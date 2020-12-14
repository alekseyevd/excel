function list(a) {
  return a.map(el =>{
    return `<li class="db__record">
      <a href="#excel/${el.hash}">${el.title}</a>
      <strong>${new Date(el.date).toDateString()}</strong>
    </li>`
  }).join('')
}

export function compile(data) {
  return `<div class="db">
    <div class="db__header">
      <h1>Excel</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#" class="db__create">
          Новая <br /> таблица
        </a>
      </div>
    </div>

    ${data.loading
      ? `<loader-component></loader-component>`
      : `<div class="db__table db__view">
          <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
          </div>
          ${data.data.length
            ? `<ul class="db__list">
                ${list(data.data)}
              </ul>`
            : `<div>Создайте ваш первую таблицу</div>`}
        </div>`}
  </div>`
}
