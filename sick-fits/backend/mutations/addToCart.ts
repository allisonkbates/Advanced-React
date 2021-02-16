import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // Query the current user and see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("you must be logged in");
  }

  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `This item is already ${existingCartItem.quantity} in the cart, increment by one`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // Query the current user's cart
  // Is the item they're adding already in the cart?
  // If it is, increment by one
  // If it isn't, create a new cart item
}
