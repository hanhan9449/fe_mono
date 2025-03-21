import React, { FC, useState } from "react";
import { act, render } from "@testing-library/react";
import { useThrottle } from "./useThrottle";
import { describe, test, expect } from "vitest";

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
describe("useThrottle hook testing suite", function () {
  test("throttle work nice", async () => {
    const component = render(<Test />);
    const valueEl = await component.getByTestId("value");
    const buttonEl = await component.getByTestId("button");
    expect(valueEl.innerHTML).toBe("0");
    for (let i = 0; i < 5; i++) {
      buttonEl.click();
    }
    expect(valueEl.innerHTML).toBe("1");
    await wait(500);
    expect(valueEl.innerHTML).toBe("1");
    await wait(600);
    expect(valueEl.innerHTML).toBe("1");
    for (let i = 0; i < 5; i++) {
      buttonEl.click();
    }
    expect(valueEl.innerHTML).toBe("2");
    await wait(1100);
    expect(valueEl.innerHTML).toBe("2");
  });
});
const Test: FC = () => {
  const [value, setValue] = useState(0);
  function updateValue() {
    act(() => {
      // 函数直接使用state值的场景
      // value仍然能取到最新的值
      setValue(value + 1);
    });
  }
  const debouncedUpdateValue = useThrottle(updateValue, 1000);
  return (
    <div>
      <span data-testid="value">{value}</span>
      <button data-testid={"button"} onClick={debouncedUpdateValue}>
        button
      </button>
    </div>
  );
};
