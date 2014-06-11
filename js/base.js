"use strict";
(function() {
	var tag = document.querySelector("#stack-overflow-tag"),
		startDate = document.querySelector("#start-date"),
		endDate = document.querySelector("#end-date"),
		timePeriod = document.querySelector("#time-period"),		
		year = new Date().getFullYear(),
		month = new Date().getMonth() + 1,
		daysinMonth = 31,
		questions = {
			tag : "firefox-os",
			startDate : "2014-05-01",
			endDate : "2014-05-31",		
			timePeriod : "month",
			withActivity : {
				total : 0
			},
			unanswered :  {
				total : 0
			},
			topAskers : {
				items  : []
			},
			faq : {
				items  : []
			},
			relatedTags : {
				items  : []
			}
		};

	// Setting up the form
	switch (month){
		case 2:
			daysinMonth = 28;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			daysinMonth = 30;
			break;
		default:
			daysinMonth = 31;
	}

	month = (month < 10)? "0" + month : month;
	startDate.value = year + "-" + month + "-01";
	endDate.value = year + "-" + month + "-" + daysinMonth;

	document.querySelector("#selection-form").onsubmit = function (evt) {
		checkReports();
		evt.preventDefault();
	};


	function addResults (type) {
		var questionsWithActivity = questions.withActivity.total,
			unansweredQuestions = questions.unanswered.total,
			percentageUnanswered = (questionsWithActivity > 0)? parseFloat((unansweredQuestions/questionsWithActivity) * 100).toFixed(2) : "100";

		// Popular tags, for filling the <datalist> element
		if (type === "popularTags") {
			var popularTagsList = document.querySelector("#popular-tags"),
				popularTags = questions.popularTags.items,
				popularTagsResults = "";
			for (var i=0,l=popularTags.length, tag; i<l; i++) {
				tag = popularTags[i];
				popularTagsResults += "<option value=\"" + tag.name + "\">";
			}
			popularTagsList.innerHTML = popularTagsResults;
		}		

		// With activity
		if (type === "withActivity") {
			document.querySelector("#questions-with-activity").innerHTML = questionsWithActivity;
		}

		// With activity or unanswered, to compare results
		if (type === "withActivity" || type === "unanswered") {
			document.querySelector("#questions-results").innerHTML = percentageUnanswered + "% unanswered";
		}

		// Unanswered
		if (type === "unanswered") {
			document.querySelector("#unanswered-questions").innerHTML = unansweredQuestions;

			var unanswered = document.querySelector("#unanswered"),
				allUnanswered = questions.unanswered.items;
			if (allUnanswered) {
				var totalUnanswereds = (allUnanswered.length > 10)? 10 : allUnanswered.length,
					unansweredResults = "<ul>";

				for (var j=0,jl=totalUnanswereds, question; j<jl; j++) {
					question = allUnanswered[j];
					unansweredResults += "<li>" + 
									"<a href=\"" + question.link + "\">" +
									question.title + "</a><br>" + 
									"<small>" + question.tags.toString(", ") + "</small></li>";
				}
				unansweredResults += "</ul>";
				unanswered.innerHTML = unansweredResults;
			}
		}

		// Top answerers
		if (type === "topAnswerers") {
			var topAnswerers = document.querySelector("#top-answerers"),
				allTopAnswerers = questions.topAnswerers.items;
			if (allTopAnswerers) {
				var totalTopAnswerers = (allTopAnswerers.length > 5)? 5 : allTopAnswerers.length,
					topAnswerersResults = "<ul>";

				for (var k=0,kl=totalTopAnswerers, answerer; k<kl; k++) {
					answerer = allTopAnswerers[k];
					topAnswerersResults += "<li>" + 
										"<a href=\"" + answerer.user.link + "\">" +
										"<img src=\"" + answerer.user.profile_image + "\" alt=\"\">" + 
										answerer.user.display_name + "</a>" + ", Score: " + answerer.score + " (" + 
										answerer.post_count + " question" + ((answerer.post_count > 1)? "s" : "") + ")</li>";
				}
				topAnswerersResults += "</ul>";
				topAnswerers.innerHTML = topAnswerersResults;
			}
		}

		// Top askers
		if (type === "topAskers") {
			var topAskers = document.querySelector("#top-askers"),
				allTopAskers = questions.topAskers.items;
			if (allTopAskers) {
				var totalTopAskers = (allTopAskers.length > 5)? 5 : allTopAskers.length,
					topAskersResults = "<ul>";

				for (var m=0,ml=totalTopAskers, asker; m<ml; m++) {
					asker = allTopAskers[m];
					topAskersResults += "<li>" + 
										"<a href=\"" + asker.user.link + "\">" +
										"<img src=\"" + asker.user.profile_image + "\" alt=\"\">" + 
										asker.user.display_name + "</a>" + ", " + asker.post_count + " question" + ((asker.post_count > 1)? "s" : "") + "</li>";
				}
				topAskersResults += "</ul>";
				topAskers.innerHTML = topAskersResults;
			}
		}

		// Frequently asked questions
		if (type === "faq") {
			var faq = document.querySelector("#faq"),
				allFaq = questions.faq.items;
			if (allFaq) {
				var totalFaqs = (allFaq.length > 10)? 10 : allFaq.length,
					faqResults = "<ul>";

				for (var n=0,nl=totalFaqs, faqQuestion; n<nl; n++) {
					faqQuestion = allFaq[n];
					faqResults += "<li>" + 
									"<a href=\"" + faqQuestion.link + "\">" +
									faqQuestion.title + "</a><br>" + 
									"<small>" + faqQuestion.tags.toString(", ") + "</small></li>";
				}
				faqResults += "</ul>";
				faq.innerHTML = faqResults;
			}
		}

		// Related tags
		if (type === "relatedTags") {
			var relatedTags = document.querySelector("#related-tags"),
				allRelatedTags = questions.relatedTags.items;
			if (allRelatedTags) {
				var totalRelatedTags = (allRelatedTags.length > 10)? 10 : allRelatedTags.length,
					relatedTagsResults = "<ul>";

				for (var o=0,ol=totalRelatedTags, relatedTag; o<ol; o++) {
					relatedTag = allRelatedTags[o];
					relatedTagsResults += "<li>" + 
									"<a href=\"http://stackoverflow.com/questions/tagged/" + relatedTag.name + "\">" +
									relatedTag.name + "</a></li>";
				}
				relatedTagsResults += "</ul>";
				relatedTags.innerHTML = relatedTagsResults;
			}
		}
	}

	function showErrors (name, msg) {
		var error = document.querySelector("#error");
		error.innerHTML = name + "<br>" + msg;
	}

	function getItems(type, url) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				//console.log("Type: " + type);
				//console.log(xhr.response);
				var response = xhr.response,
					quotaRemaining = response.quota_remaining;

				if (response.error_message) {
					showErrors(response.error_name, response.error_message);
				}
				else {
					questions[type] = response;
					addResults(type);
				}				

				// Remining requests today from your IP
				if (quotaRemaining) {
					document.querySelector("#remaining-requests").innerHTML = quotaRemaining;
				}
			}
		};
		
		xhr.open("GET", url, true);
		xhr.responseType = "json";
		xhr.send(null);
	}

	function getQuestionsWithActivity () {
		// All questions for a certain time period - http://api.stackexchange.com/docs/search
		getItems("withActivity", "http://api.stackexchange.com/2.2/search?fromdate=" + questions.startDate + "&todate=" + questions.	endDate + "&order=desc&sort=activity&tagged=" + questions.tag + "&site=stackoverflow&filter=!9WA((MBIa");
	}

	function getUnansweredQuestions () {
		// All questions without an answer for a certain time period - http://api.stackexchange.com/docs/unanswered-questions
		// "At this time a question must have at least one upvoted answer to be considered answered"
		getItems("unanswered", "http://api.stackexchange.com/2.2/questions/unanswered?fromdate=" + questions.startDate + "&todate=" + questions.endDate + "&order=desc&sort=activity&tagged=" + questions.tag + "&site=stackoverflow&filter=!9WA((MBIa");
	}

	function topAnswerers () {
		getItems("topAnswerers", "http://api.stackexchange.com/2.2/tags/" + questions.tag + "/top-answerers/" + questions.timePeriod + "?site=stackoverflow");
	}

	function topAskers () {
		getItems("topAskers", "http://api.stackexchange.com/2.2/tags/" + questions.tag + "/top-askers/" + questions.timePeriod + "?site=stackoverflow");
	}

	function faq () {
		getItems("faq", "http://api.stackexchange.com/2.2/tags/" + questions.tag + "/faq?site=stackoverflow");
	}

	function relatedTags () {
		getItems("relatedTags", "http://api.stackexchange.com/2.2/tags/" + questions.tag + "/related?site=stackoverflow");
	}

	function checkReports () {
		questions.tag = tag.value;
		questions.startDate = startDate.value;
		questions.endDate = endDate.value;		
		questions.timePeriod = timePeriod.value;

		// Get reports
		getQuestionsWithActivity();
		getUnansweredQuestions();
		topAnswerers();
		topAskers();
		faq();
		relatedTags();
	}

	function getPopularTags () {
		getItems("popularTags", "http://api.stackexchange.com/2.2/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow");
	}

	// Run automatically at page load to pre-populate the <datalist> element
	getPopularTags();
})();