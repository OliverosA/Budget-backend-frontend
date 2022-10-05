import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRequest from "./useRequest";
import { setSelectedAccount } from "../store/slices/bankaccount/bankaccountSlice";

const SideBar = () => {
  const { accounts } = useSelector((state) => state.bankaccount);

  const { getPersonAccounts, getAccountCurrencySymbol } = useRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getPersonAccounts();
  }, []);

  const showAccountsInfo = () => {
    return Object.entries(accounts).length === 0 ? (
      "No accounts registered with this user"
    ) : (
      <>
        {accounts?.map((account) => (
          <Dropdown.Item
            className="sideMenuItem"
            as="button"
            key={account.account_number}
            onClick={() => {
              dispatch(setSelectedAccount(account));
              navigate("/history", { replace: true });
            }}
          >
            <div>
              <h5>
                Account: {account.account_number} <br />
                Balance:{" "}
                {`${getAccountCurrencySymbol(account.currency)} ${Number(
                  account.balance
                ).toFixed(2)}`}
              </h5>
            </div>
          </Dropdown.Item>
        ))}
      </>
    );
  };

  return (
    <div className="sideMenuContainer">
      <Dropdown.Menu show className="sideMenuHeader">
        <Dropdown.ItemText>
          <h3>Accounts List</h3>
        </Dropdown.ItemText>
        <Dropdown.Divider />
        {showAccountsInfo()}
        <Dropdown.Divider />
        <Dropdown.Item
          as="button"
          onClick={() => {
            navigate("/addAccount", { replace: true });
          }}
        >
          <h5>Add Bank Account</h5>
        </Dropdown.Item>
      </Dropdown.Menu>
    </div>
  );
};

export default SideBar;
