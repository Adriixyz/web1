$(document).ready(function() {
    // Function to load news headlines dynamically
    function loadNewsHeadlines() {
        $.ajax({
            url: 'news-headlines.json', // JSON file containing news headlines and URLs
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var newsList = $('#news-list');

                // Clear existing list items
                newsList.empty();

                // Add new list items for each news article
                data.articles.forEach(function(article) {
                    var listItem = $('<li><a href="' + article.url + '" class="news-link">' + article.headline + '</a></li>');
                    newsList.append(listItem);
                });

                // Attach click event listener to dynamically created news links
                $('.news-link').click(function(event) {
                    event.preventDefault();
                    var url = $(this).attr('href');

                    // Fetch the content from the URL
                    $.ajax({
                        url: url,
                        type: 'GET',
                        success: function(articleContent) {
                            $('#article-container').html(articleContent); // Inject the content into the article container
                            $('html, body').animate({
                                scrollTop: $('#article-container').offset().top // Scroll to the top of article container
                            }, 500); // Animation duration in milliseconds
                        },
                        error: function() {
                            $('#article-container').html('<p>Error loading article.</p>'); // Display error message if fetching fails
                        }
                    });
                });
            },
            error: function() {
                console.error('Error loading news headlines.');
            }
        });
    }

    // Initial load of news headlines
    loadNewsHeadlines();

    // Periodically refresh news headlines (e.g., every 5 minutes)
    setInterval(function() {
        loadNewsHeadlines();
    }, 300000); // 300000 milliseconds = 5 minutes
});