Stack Overflow Dashboard
=======================

A dashboard to check the popularity and engagement for tags on Stack Overflow. Based on the [Mozilla tags on Stack Overflow dashboard](http://robnyman.github.io/mozilla-stackoverflow/).

## Features

Numbers and developer behavior are always interesting areas, especially to spot trends, common questions, related areas and more. As Stack Overflow is one of the de facto channels where developers ask questions to solve problems I find it very interesting to look at those numbers and see possible correlations.

[![](https://hacks.mozilla.org/wp-content/uploads/2014/06/stack-overflow-dashboard-500.png)](http://robnyman.github.io/stackoverflow-dashboard/)

You can filter the data based on dates and time periods (different data is available through one or the other option), and the areas the dashboard offers information for are:

- Questions:
	- # with activity
	- # of unanswered
	- Percentage of unanswered questions (*Note that a question must have at least one upvoted answer to be considered answered*)
	- List of unanswered questions
	- Frequently asked questions
- Top answerers
- Top askers
- Related tags

## The approach

My thinking was to use the [Stack Exchange API](http://api.stackexchange.com/docs/) and do simple requests for various tags end the engagement around them. I also wanted to make it easy for the user and autocomplete values for the tag criteria field. Given how many tags there are on Stack Overflow, though, to avoid massive overload I only get the 100 most popular tags and put them in a `<datalist>` element, connected to the `<input>` element where the user enters the tag to look for data for. This is being done directly on page load.

[![](https://hacks.mozilla.org/wp-content/uploads/2014/06/stack-overflow-dashboard-autocomplete-500.png)](https://hacks.mozilla.org/wp-content/uploads/2014/06/stack-overflow-dashboard-autocomplete.png)			

### General mindset

The general mindset when building up the dashboard:

1. Create a simple HTML form with tag, date period input
2. Use a simple XMLHttpRequest to get the most popular tags for the `<datalist>` element
3. For any request, use the basic XHR to get the data directly in JSON
4. Depending on the requested data - multiple requests are needed to fill the dashboard - parse the returned JSON and present the results

### API methods being used

The other API methods that are being called are:

* [http://api.stackexchange.com/docs/tags](http://api.stackexchange.com/docs/tags)
* [http://api.stackexchange.com/docs/search](http://api.stackexchange.com/docs/search)
* [http://api.stackexchange.com/docs/unanswered-questions](http://api.stackexchange.com/docs/unanswered-questions)
* [http://api.stackexchange.com/docs/top-answerers-on-tags](http://api.stackexchange.com/docs/top-answerers-on-tags)
* [http://api.stackexchange.com/docs/top-askers-on-tags](http://api.stackexchange.com/docs/top-askers-on-tags)
* [http://api.stackexchange.com/docs/faqs-by-tags](http://api.stackexchange.com/docs/faqs-by-tags)
* [http://api.stackexchange.com/docs/related-tags](http://api.stackexchange.com/docs/related-tags)

### Request throttling

Note that the [limit for each IP number is 300 requests](http://api.stackexchange.com/docs/throttle) per 24 hours (unless you have an access_token, then the limit is 10,000).


## Code

The idea has been to keep it as simple and free of dependencies as possible. It doesn't use any JavaScript libraries as I see the use cases here, and where we are right now with HTML5, competent enough not to need that.

## Give feedback & hack it

I hope you find this interesting, and a good point to evaluate which areas to focus on and learn more! Also feel more than welcome to [use the dashboard](http://robnyman.github.io/stackoverflow-dashboard/), check out [the code](https://github.com/robnyman/stackoverflow-dashboard) and issue pull requests, suggest features and more!
