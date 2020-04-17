import folders from './subjects'

type ProbablySubjects = Array<keyof typeof folders>

type Day = ProbablySubjects[]

type Table = Day[]

const table: Table = [
  [
    ['history'],
    ['informatics1'],
    ['literature'],
    ['pe', 'mathMore']
  ],
  [
    ['pe'],
    ['physics'],
    ['algebra'],
    [null, 'geography']
  ],
  [
    ['geometry'],
    ['russian'],
    ['physics'],
    [null, 'russianMore']
  ],
  [
    ['chemistry', 'history', 'chemistry', 'literature'],
    ['english1'],
    ['algebra'],
    ['bmt']
  ],
  [
    ['biology', 'ukrainian'],
    ['algebra', 'geometry'],
    ['citizen', 'jurisprudence'],
    [null, 'astronomy', null, 'physics']
  ]
]

const timetable = (date: Date): unknown[] => {
  const day = date.getDay() === 0 ? 6 : date.getDay() - 1

  const currentWeek = Math.floor(date.getDate() / 7) % 4
  console.log(currentWeek)
  const currentTable = []
  table[day].forEach((possible: string[]) => {
    const name = possible[currentWeek % possible.length]
    const data = folders[name]
    if (name) {
      currentTable.push({ key: name, name: data[0].replace(/ \(\d-я группа\)/, ''), lessons: [] })
    }
  })
  return currentTable
}

export default timetable
