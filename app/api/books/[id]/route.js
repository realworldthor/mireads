import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Book from '@/models/Book';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}