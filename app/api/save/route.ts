import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.email && body.phone) {
      // Handle contact info
      const filePath = path.join(process.cwd(), 'data', 'contacts.csv')
      const isNewFile = !fs.existsSync(filePath)
      const data = `${body.email},${body.phone}\n`

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath))
      }

      if (isNewFile) {
        fs.writeFileSync(filePath, 'Email,Phone\n' + data)
      } else {
        fs.appendFileSync(filePath, data)
      }

      return NextResponse.json({ message: 'Contact saved successfully' })
    }

    if (body.idea && body.personalityType) {
      // Handle idea challenge submission
      const filePath = path.join(process.cwd(), 'data', 'ideas.csv')
      const isNewFile = !fs.existsSync(filePath)
      const ideaData = `"${body.personalityType}","${body.idea.replace(/"/g, '""')}"\n`

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath))
      }

      if (isNewFile) {
        fs.writeFileSync(filePath, 'Personality Type,Idea\n' + ideaData)
      } else {
        fs.appendFileSync(filePath, ideaData)
      }

      return NextResponse.json({ message: 'Idea saved successfully' })
    }

    return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}