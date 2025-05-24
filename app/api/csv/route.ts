import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'ideas.csv');
    const csvData = await fs.readFile(filePath, 'utf8');
    const lines = csvData.trim().split('\n');

    if (lines.length < 2) {
      return NextResponse.json({ personalityType: '', idea: '' });
    }

    const lastLine = lines[lines.length - 1];
    const [personalityTypeRaw, ideaRaw] = lastLine.split(',');

    return NextResponse.json({
      personalityType: personalityTypeRaw.replace(/"/g, '').trim(),
      idea: ideaRaw.replace(/"/g, '').trim(),
    });
  } catch (error) {
    console.error('Error reading CSV:', error);
    return NextResponse.json({ error: 'Failed to read CSV' }, { status: 500 });
  }
}