export const wait = (ms) => new Promise((r) => setTimeout(r, ms))
// Simulated network call; pass failRate > 0 to test optimistic rollback.
export const fakeRequest = async (failRate = 0) => {
  await wait(300)
  if (Math.random() < failRate) throw new Error('Network error')
}
