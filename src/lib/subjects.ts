const sortMath = (a, b) => {
  const datePattern = /(\d{2}).(\d{2}).(\d{4})/
  const [x, y] = [a.name, b.name].map(el => {
    const [, day, month, year] = datePattern.exec(el)
    return new Date(`${year}-${month}-${day}`)
  })
  if (x > y) {
    return -1
  }
  if (x < y) {
    return 1
  }
  return 0
}

export const folders = {
  physics: ['Физика', 'google', '1Lz8NQXIhZSGNycx_7hrL_SPBZW9wn1QW'],
  pe: ['Физ-ра', 'google', '1VE-uiK6_lkxKOEkvZQPifCsn44t81zPm'],
  history: ['История', 'google', '1-v1FWi4Mg9BGTRsI0LGRS7bpzHqynk0a'],
  informatics1: ['Информатика (1-я группа)', 'google', '1NTLU5nZLPxsQu_xEhydRmAxe2avFqYgI'],
  informatics2: ['Информатика (2-я группа)', 'google', '1NxDVpC9_kV6ASoNBRhxvIybn7URBy480'],
  english1: ['Англ.яз (1-я группа)', 'google', '1S2Tbi4_3rGieqZNsHOV_FMIKcc0h2r7-'],
  english2: ['Англ.яз (2-я группа)', 'google', '1ukXmcjPsRZaqo9-2-NE1RjEM1KGVTJKe'],
  literature: ['Литература', 'google', '1o354vuDZ9moR5ivk5HiRKk6aY1Actput'],
  russian: ['Русский язык', 'google', '1TyO2w29W0b70pTYYOprCGbqF6MNrs1yo'],
  chemistry: ['Химия', 'google', '18D0IP_sfe9ABQl3LKDmkbgXGQcILPZKq'],
  biology: ['Биология', 'google', '19WGsV736zHx1mTs6pVcQEBy5N5V7OrsK'],
  citizen: ['УГДД и спецкурс "Уроки Победы"', 'google', '1fESHRlHz0hzhFBCbc6VAPb3CqbbsZVTe'],
  jurisprudence: ['Правоведение', 'google', '1QccDPO6M-Y2QEcZDzoyXTXPWmxNTufL8'],
  russianMore: ['Русский язык (факультатив)', 'google', '10GLzL81s8Q0C24UrK8DeshPgAnYH9fc7'],
  astronomy: ['Астрономия', 'google', '1SrQet4Bt3-RBFRWpDZkn7B31fUyCCzm1'],

  algebra: ['Алгебра', 'mailru', '4CoK/4Zc9Cs2hH/403 группа/Алгебра', sortMath],
  geometry: ['Геометрия', 'mailru', '4CoK/4Zc9Cs2hH/403 группа/Геометрия', sortMath],
  mathMore: ['Математика (факультатив)', 'mailru', '4CoK/4Zc9Cs2hH/403 группа/Факультатив', sortMath],
  geography: ['География', 'mailru', '5PNB/6DAzJzDVZ/403/'],
  bmt: ['НВП', 'mailru', '3amT/36MXYenJU/НВП/'],

  ukrainian: ['Укр.яз', 'google', '1fGPKTSjPYNBbqpznfEKldYz2m_YQ21J5']
}

export default folders
