import { folders } from './subjects'
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

export const createUrl = (provider: Service, id: string): string => publicUrl[provider] + id

class CloudDrive extends RESTDataSource {
  provider: Service

  async getFiles (subjectKey: string): Promise<unknown[]> {
    const subject = folders[subjectKey]
    const provider: Service = subject[1]

    if (provider === null) return []
    this.baseURL = apiUrl[provider]
    let data
    if (provider === 'google') {
      data = await this.get('files', {
        q: `"${subject[2]}" in parents`,
        orderBy: 'createdTime desc',
        key: process.env.GOOGLE_APIKEY,
        userIp: this.context.ip
      })
      return data.files
    } else {
      data = await this.get('folder', {
        weblink: subject[2]
      })
      let { list } = data.body
      console.log(list)
      if (subject[3]) {
        list = list.sort(subject[3])
      }
      return list
    }
  }
}

export default CloudDrive
