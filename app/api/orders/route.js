import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { items, total, address } = await req.json();

    await connectDB();

    const order = await Order.create({
      user: session.user.id,
      items,
      total,
      address,
    });

    return NextResponse.json(
      { message: 'Order placed successfully', orderId: order._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();

    const orders = await Order.find({ user: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}