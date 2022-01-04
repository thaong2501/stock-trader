import { router } from "../main";

export const buyStocks = (
  { commit, state, dispatch, getters },
  { id, price, quantity }
) => {
  const oldFunds = getters.funds;
  const portfolioState = state.portfolio.portfolio;
  const record = portfolioState.find((el) => el.id === id);
  if (oldFunds >= quantity * price) {
    if (record) {
      record.quantity += quantity;
    } else {
      portfolioState.push({ id: id, quantity: quantity });
    }
    const newFunds = oldFunds - quantity * price;
    commit("SET_FUNDS", newFunds);
    dispatch("updateFunds", newFunds);
    localStorage.setItem("funds", newFunds);
    dispatch("updatePortfolio");
  } else {
    alert("Your fund is not enough!");
  }

  if (state.auth.tokenId === null) {
    router.push("/signin").catch(() => {});
  }
};

export const sellStocks = (
  { state, getters, commit, dispatch },
  { id, price, quantity }
) => {
  const portfolioState = state.portfolio.portfolio;
  const record = portfolioState.find((el) => el.id === id);
  if (record.quantity < quantity) {
    alert("Not enough quantity!");
    return;
  } else if (record.quantity > quantity) {
    record.quantity -= quantity;
  } else {
    portfolioState.splice(portfolioState.indexOf(record), 1);
  }
  const funds = getters.funds + quantity * price;
  commit("SET_FUNDS", funds);
  dispatch("updateFunds", funds);
  localStorage.setItem("funds", funds);
  dispatch("updatePortfolio");
};
