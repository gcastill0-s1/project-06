// const code = document.getElementById("highlightedCode");
// const fragments = getFragments(code.innerHTML);
// const joinedFragments = joinFragments(fragments);
// code.innerHTML = joinedFragments;

// Fetch the Markdown file from a URL
fetch("md/powerqueries.md")
  .then((response) => response.text())
  .then((markdownContent) => {
    processMarkdown(markdownContent); // Process the fetched content
  })
  .catch((error) => {
    console.error("Error fetching the Markdown file:", error);
  });

function processMarkdown(markdown) {
  const codeBlockRegex = /```(?:PowerQuery|sql|code)?\n([\s\S]*?)```/g;
  let match;
  const searches = [];

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    searches.push(match[1].trim());
  }

  searches.forEach((search) => createHighlightedCodeCard(search));
}

function createHighlightedCodeCard(search) {
    const codeElement = document.createElement('code');
    codeElement.classList.add('highlightedCode');
    codeElement.textContent = search;
    
    const fragmentss = getFragments(codeElement.textContent);
    const joinedFragment = joinFragments(fragmentss);
    codeElement.innerHTML = joinedFragment;

    const card = document.createElement('div');
    card.classList.add('pqhighlighter');
    card.appendChild(codeElement);

    document.getElementById('cardContainer').appendChild(card);
}

function highlightSyntaxPowerQuery(search) {
    // Use the syntax highlighter function we discussed earlier or a library
    return highlightSyntax(search);
}

// Function to escape HTML characters
function unescapeHTMLescapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function unescapeHTML(safe) {
    return safe.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


// Function to join the fragments while ensuring no space before commas, semicolons, or between a function and the next operator
function joinFragments(fragments) {
  return fragments.reduce((accumulator, currentFragment, index) => {
    // Get the next fragment
    const lastFragment = fragments[index - 1] || "";
    const nextFragment = fragments[index + 1] || "";


    const currentContent = currentFragment.match(/<span.*?>(.*?)<\/span>/);
    const content = currentContent ? currentContent[1].trim() : currentFragment;


    const isNumber = currentFragment.includes('class="number"');

    const isOperator = currentFragment.includes('class="operator"');
    const isNextOperator = nextFragment.includes('class="operator"');
    const isLastOperator = lastFragment.includes('class="operator"');

    const isFunction = currentFragment.includes('class="function"');
    const isNextFunction = nextFragment.includes('class="function"');
    const isLastFunction = lastFragment.includes('class="function"');

    const isMetadata = currentFragment.includes('class="metadata"');
    const isNextMetadata = nextFragment.includes('class="metadata"');

    if ((isLastOperator && content === ",") || (isOperator && isLastOperator) || (isLastFunction && isOperator)) {
      return accumulator + currentFragment; // Don't add a space between operators
    } 
    else {
      return accumulator + " " + currentFragment ; // Add a space before all other fragments
    }
  }, "");
}

function getFragments(codeText) {
  const fragments = codeText.match(
    /[a-zA-Z0-9,_]+|['"`].*?['"`]|[-+\/\*=<>!]+|\(|\)|\||;|\s{4,}|\r?\n/g
  );

  let highlightedFragments = [];

  fragments.forEach((fragment) => {
    let highlighted = highlightSyntax(fragment);
    highlightedFragments.push(highlighted);
  });

  return highlightedFragments;
}

function highlightSyntax(code) {
  // Define regex patterns for each category
  const operatorPattern =
    /(\||\(|\)|\/\/|\+|\-|\*|\/|%|\-x|<|<=|>|>=|=|==|!=|&&|\|\||!|AND|OR|NOT|\?:)/g;
  const expressionPattern =
    /\b(from|by|columns|filter|group|join|let|limit|lookup|savelookup|parse|sort|transpose|union)\b/g;
  const functionPattern =
    /\b(contains|matchcase|matches|sca:bytesToCharge|count|sum|avg|min|min_by|max|max_by|median|pct|p10,p50,p90,p95,p99,999|stddev|estimate_distinct|first|last|oldest|newest|any|any_true|all_true|running_sum|running_count|overall_sum|overall_count|overall_min|overall_max|overall_avg|percent_of_total|running_percent|expand|array_expand|json_object_value|len|lower|upper|ltrim|rtrim|trim|substr|replace|isempty|isblank|string|pad_version|format|abs|ceiling|floor|sqrt|exp|ln|log|pow|net_ip|net_ipv4|net_ipv6|net_ipsubnet|net_private|net_rfc1918|net_rfc4193|timebucket|querystart|queryend|queryspan|strftime|now|simpledateformat|strptime|simpledateparse|geo_ip_location|geo_ip_city|geo_ip_state|geo_ip_state_iso|geo_ip_country|geo_ip_country_iso|geo_ip_continent|geo_ip_continent_code|geo_point|geo_point_within_polygon|geo_distance|array_agg|array_agg_distinct|array_mean|array_sum|array_min|array_max|array_median|array_map|array_from_json|array_to_json|array_distinct|array_sort|array|extract_matches|extract_matches_matchcase|array_split|array_split_matchcase|array_slice|array_intersect|array_reduce|array_filter|array_zip|array_concat|array_set|array_get|array_contains|array_match_any|array_match_all|array_to_string)\b/g;

  const stringPattern = /(['"`])(\\?.)*?\1/g; // General string pattern
  const numberPattern = /\b\d+\b/g; // Numbers
  const commentPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g; // Comments

  // Apply the highlighting

  // Apply the correct highlight class based on the fragment type
  if (commentPattern.test(code)) {
    return `<span class="comment">${code}</span>`;
  } else if (stringPattern.test(code)) {
    return `<span class="string">${code}</span>`;
  } else if (operatorPattern.test(code)) {
    return `<span class="operator">${code}</span>`;
  } else if (expressionPattern.test(code)) {
    return `<span class="expression">${code}</span>`;
  } else if (functionPattern.test(code)) {
    return `<span class="function">${code}</span>`;
  } else if (numberPattern.test(code)) {
    return `<span class="number">${code}</span>`;
  } else {
    return `<span class="metadata">${code}</span>`;
  }

  return code;
}
