/**
 * Our tests use Jasmine.
 */

describe('RNDeviceFarm Device Test', () => {
  it('Should contain step one text', () => {
    // We need to wait for the component to be visible.
    // The ~ is how we select on testId
    const stepOneText = $("~step_one");
    stepOneText.waitForDisplayed(20000);
    expect(stepOneText.getText()).toBe('Step One');
  });
});
