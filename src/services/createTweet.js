const createTweet = async (service, category) => {
  const response = await fetch(`https://tweetgenerator.app/api/${service}/${category}`)
  const { tweet: message } = await response.json()
  return message
}

export default createTweet
