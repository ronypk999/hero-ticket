const tableData = document.getElementById("tableData");
const seatLeft = document.getElementById("seatLeft");
const seat = document.getElementById("seat");
const ticketMsg = document.getElementById("ticketMessage");
const ticketBtn = document.querySelectorAll("#ticketBtn");
const ticketPrice = 550;
const couponInput = document.getElementById("couponInput");
const totalPrice = document.getElementById("totalPrice");
const grandTotalPrice = document.getElementById("grandTotalPrice");
const couponDiv = document.getElementById("couponDiv");
const couponCodes = ["NEW15", "Couple 20"];
ticketBtn.forEach((ticket) => {
  ticket.addEventListener("click", (e) => {
    ticketFunction(e.target);
  });
});

const ticketFunction = (ticket) => {
  if (ticket.classList.contains("bg-green-500")) {
    addErrorMessageBooked(ticket.innerText);
  } else if (ticket.classList.contains("border-green-500")) {
    removeMethod(ticket);
  } else {
    const success = addSuccessMessageBooked(ticket.innerText);
    if (success) {
      ticket.classList.add("border-green-500", "border-4");
    }
  }
};

//message alert of select/remove/booked seat

const addErrorMessageBooked = (ticketNumber) => {
  if (ticketMsg.childNodes.length > 0) {
    let valid = 0;
    ticketMsg.childNodes.forEach((singleNode) => {
      if (singleNode.innerText.includes(ticketNumber)) {
        valid = 1;
      }
    });
    if (valid === 0) {
      insertErrorNode(ticketNumber);
      return true;
    }
  } else {
    insertErrorNode(ticketNumber);
    return true;
  }

  return false;
};

const addSuccessMessageBooked = (ticketNumber) => {
  if (ticketMsg.childNodes.length > 0) {
    let valid = 0;
    ticketMsg.childNodes.forEach((singleNode) => {
      if (singleNode.innerText.includes(ticketNumber)) {
        valid = 1;
      }
    });
    if (valid === 0) {
      insertSuccessNode(ticketNumber);
      return true;
    }
  } else {
    insertSuccessNode(ticketNumber);
    return true;
  }

  return false;
};

const insertErrorNode = (ticketNumber) => {
  const msgNode = document.createElement("div");
  msgNode.classList.add("text-red-500");
  msgNode.innerText = `${ticketNumber} is booked`;
  ticketMsg.appendChild(msgNode);
  setTimeout(() => {
    msgNode.remove();
  }, 5000);
};

const insertSuccessNode = (ticketNumber) => {
  //success alert
  const msgNode = document.createElement("div");
  msgNode.classList.add("text-green-500");
  msgNode.innerText = `${ticketNumber} is added`;
  ticketMsg.appendChild(msgNode);

  setTimeout(() => {
    msgNode.remove();
  }, 5000);

  //insert new row
  const tableRow = document.createElement("tr");
  const tableBody1 = document.createElement("td");
  const tableBody2 = document.createElement("td");
  const tableBody3 = document.createElement("td");
  tableBody1.innerText = ticketNumber;
  tableBody2.innerText = "Economoy Specialist";
  tableBody3.innerText = ticketPrice;
  tableRow.classList.add(ticketNumber);
  tableRow.appendChild(tableBody1);
  tableRow.appendChild(tableBody2);
  tableRow.appendChild(tableBody3);

  tableData.appendChild(tableRow);

  //minus from left seat
  seatLeft.innerText = parseInt(seatLeft.innerText) - 1;
  //plus into seat
  seat.innerText = parseInt(seat.innerText) + 1;
  //total price plus

  const total = parseInt(totalPrice.innerText) + ticketPrice;

  totalPrice.innerText = total;
  //grand total
  grandTotalPrice.innerText = total;
};

const removeMethod = (ticket) => {
  //remove alert
  ticket.classList.remove("border-green-500", "border-4");
  const msgNode = document.createElement("div");
  msgNode.classList.add("text-orange-500");
  msgNode.innerText = `${ticket.innerText} is removed`;
  ticketMsg.appendChild(msgNode);
  setTimeout(() => {
    msgNode.remove();
  }, 5000);

  //plus on left seat
  seatLeft.innerText = parseInt(seatLeft.innerText) + 1;
  //minus from seat
  seat.innerText = parseInt(seat.innerText) - 1;
  //remove table child
  document.querySelectorAll("." + ticket.innerText).forEach((tr) => {
    tr.remove();
  });

  //total price minus

  const total = parseInt(totalPrice.innerText) - ticketPrice;

  totalPrice.innerText = total;

  //grand total
  grandTotalPrice.innerText = total;
};

//message alert of select/remove/booked seat Ends here

//coupon validator

const coupon = (btn) => {
  if (couponCodes.includes(couponInput.value)) {
    // couponDiv.classList.add("hidden");
    couponInput.setAttribute("disabled", true);
    btn.innerText = "Applied";
    btn.setAttribute("disabled", true);
  } else {
    console.log("not matched");
  }
};
