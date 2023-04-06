import { rename, stat, unlink } from 'fs/promises'
import { resolve } from 'path'

import uploadConfig from '@/config/upload'

import { IStorageProvider } from '../IStorageProvider'

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(`${uploadConfig.tmpFolder}/${folder}`, file),
    )

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${uploadConfig.tmpFolder}/${folder}`, file)

    try {
      await stat(filename)
    } catch {
      return
    }
    await unlink(filename)
  }
}

export { LocalStorageProvider }
