export const validateEmail = (email) => {
  const regexStr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regexStr.test(email)
}

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;

  const checks = [
    {
      msg: "Name, Description, Brand, Sku/ number added successfully.",
      type: "success",
    },
  ];

  if (images.length < 3) {
    checks.push({
      msg: `Choose atleast 3 images (${3 - images.length} remaining).`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length} images choosen.`,
      type: "success",
    });
  }

  if (!product.color.color) {
    checks.push({
      msg: `Choose a main product color.`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Product color been choosen.`,
      type: "success",
    });
  }

  if (!product.color.image) {
    checks.push({
      msg: `Choose a product style image.`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Product style image been choosen.`,
      type: "success",
    });
  }

  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i].qty === "" || sizes[i].price === 0 || sizes[i].size === 0) {
      checks.push({
        msg: `Please fill all information on sizes.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Atleast one size/qty/price added.`,
        type: "success",
      });
    }
  }

  for (var i = 0; i < details.length; i++) {
    if (details[i].name === "" || details[i].value === "") {
      checks.push({
        msg: `Please fill all information on details.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Atleast one detail added.`,
        type: "success",
      });
    }
  }

  for (var i = 0; i < questions.length; i++) {
    if (questions[i].question === "" || details[i].answer === "") {
      checks.push({
        msg: `Please fill all information on questions.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Atleast one question added.`,
        type: "success",
      });
    }
  }

  let s_test = checks.find((c) => c.type === "error");

  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};

// export default validateEmail