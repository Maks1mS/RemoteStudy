import Subjects, { folders } from './subjects'
import { RESTDataSource } from 'apollo-datasource-rest'

type Service = 'google' | 'mailru'

const apiUrl = {
  google: 'https://www.googleapis.com/drive/v3/',
  mailru: 'https://cloud.mail.ru/api/v2/'
}

const publicUrl = {
  google: 'https://drive.google.com/drive/folders/',
  mailru: 'https://cloud.mail.ru/public/'
}

export const createUrl = (provider: Service, id: string) => publicUrl[provider] + id

class CloudDrive extends RESTDataSource {
  provider: Service

  async getFiles (subjectKey: string) {
    const subject = folders[subjectKey]
    console.log(subject)
    const provider: Service = subject[1]

    if (provider === null) return []
    this.baseURL = apiUrl[provider]
    let data
    if (provider === 'google') {
      data = await this.get('files', {
        q: `"${subject[2]}" in parents`,
        key: process.env.GOOGLE_APIKEY
      })
      return data.files
    } else {
      data = await this.get('folder', {
        weblink: subject[2]
      })
      return data.body.list
    }
  }
}

export default CloudDrive
