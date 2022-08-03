import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { StripeCheckoutProps } from "react-stripe-checkout";
import { RootState } from "../redux/store";
import { userRequest } from "../services/api";
import { singleProduct } from "../types/Product";
import { UserType } from "../types/User";

interface MyStripeCheckoutProps extends StripeCheckoutProps { 
  billing_details: {
    address: {
      city: string,
      country: string,
      line1: string,
      line2: string,
      postal_code: string,
      state: any
    }
    email: string,
    name: string,
    phone: any
  }
}

type LocationProps = {
  user: UserType;
  state: {
    stripeData: MyStripeCheckoutProps,
    cart: any
  };
};

const Success = () => {
  
  const location = useLocation() as unknown as LocationProps;

  
  const data = location.state.stripeData;
  const cart = location.state.cart;
  console.log(data)
  console.log(cart)
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/order", {
          userId: currentUser?._id,
          products: cart.products.map((item: singleProduct) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;