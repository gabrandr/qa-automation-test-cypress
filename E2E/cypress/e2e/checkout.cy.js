function login() {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
}
function addTwoProductsToCart() {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
}
function goToCart() {
  cy.get('[data-test="shopping-cart-link"]').click();
}
function startCheckout() {
  cy.get('[data-test="checkout"]').click();
}
function fillCheckoutInformation() {
  cy.fixture("checkOutUser").then((checkoutUser) => {
    cy.get('[data-test="firstName"]').type(checkoutUser.firstName);
    cy.get('[data-test="lastName"]').type(checkoutUser.lastName);
    cy.get('[data-test="postalCode"]').type(checkoutUser.postalCode);
    cy.get('[data-test="continue"]').click();
  });
}

describe("SauceDemo purchase flow", () => {
  it("authenticates with valid credentials", () => {
    login();
    cy.url().should("include", "/inventory.html");
    cy.contains(".title", "Products").should("be.visible");
  });
  it("adds two products to the cart", () => {
    login();
    addTwoProductsToCart();
    cy.get('[data-test="shopping-cart-link"]').should("have.text", "2");
  });
  it("displays the selected products in the cart", () => {
    login();
    addTwoProductsToCart();
    goToCart();
    cy.url().should("include", "/cart.html");
    cy.contains(".title", "Your Cart").should("be.visible");
    cy.contains(".inventory_item_name", "Sauce Labs Backpack").should(
      "be.visible",
    );
    cy.contains(".inventory_item_name", "Sauce Labs Bike Light").should(
      "be.visible",
    );
  });
  it("completes the checkout information form", () => {
    login();
    addTwoProductsToCart();
    goToCart();
    startCheckout();
    fillCheckoutInformation();
    cy.url().should("include", "/checkout-step-two.html");
    cy.contains(".title", "Checkout: Overview").should("be.visible");
  });
  it("finishes the purchase and shows the confirmation message", () => {
    login();
    addTwoProductsToCart();
    goToCart();
    startCheckout();
    fillCheckoutInformation();
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete.html");
    cy.contains(
      '[data-test="complete-header"]',
      "Thank you for your order!",
    ).should("be.visible");
  });
});
