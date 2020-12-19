import "./App.css";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
function App() {
  async function displayRazorPay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed to load SDK, Are you still online??");
      return;
    }
    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());
    console.log(data);
    var options = {
      key: process.env.REACT_APP_KEY,
      amount: data.amount,
      currency: "INR",
      name: "Testing",
      description: "Testing razorpay",
      image: "http://localhost:1337/logo.svg",
      order_id: data.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Lakshya Poddar ",
        email: "xyz@example.com",
        contact: "9999999999",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          onClick={displayRazorPay}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: "1px solid #fff",
            padding: "10px",
            borderRadius: "5px",
          }}
          href
        >
          Pay Rs 499
        </a>
      </header>
    </div>
  );
}

export default App;
