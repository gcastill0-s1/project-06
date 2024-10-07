const code = document.getElementById("highlightedCode");
const fragments = getFragments(code.innerHTML);
const joinedFragments = joinFragments(fragments);
code.innerHTML = joinedFragments;

// Function to escape HTML characters
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Function to join the fragments while ensuring no space before commas, semicolons, or between a function and the next operator
function joinFragments(fragments) {
    return fragments.reduce((accumulator, currentFragment, index) => {
        // Get the next fragment
        const nextFragment = fragments[index + 1] || "";

        // Check if the current fragment is a function (contains class "function")
        const isFunction = currentFragment.includes('class="function"');
        // Check if the next fragment is an operator (contains class "operator")
        const isNextOperator = nextFragment.includes('class="operator"');

        // Add a space only if the current fragment does not begin with a comma or semicolon
        // and it's not a function followed by an operator
        if (currentFragment.startsWith(",") || currentFragment.startsWith(";") || (isFunction && isNextOperator)) {
            return accumulator + currentFragment;  // Don't add a space before commas, semicolons, or between function and operator
        } else {
            return accumulator + currentFragment + " " ;  // Add a space before all other fragments
        }
    }, "");
}

function getFragments(codeText) {

    const fragments = codeText.match(/[\w.,]+|['"`].*?['"`]|[=<>!]+|\(|\)|\||;|\s{4,}|\r?\n/g);

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
    /(\||\(|\)|\/\/|\+|\-|\*|\/|%|\-x|<|<=|>|>=|=|==|!=|&&|\|\||!|AND|OR|NOT|\?:|contains|matchcase|matches|sca:bytesToCharge)/g;
  const expressionPattern =
    /\b(columns|filter|group|join|let|limit|lookup|savelookup|parse|sort|transpose|union)\b/g;
  const functionPattern =
    /\b(from|by|count|sum|avg|min|min_by|max|max_by|median|pct|p10,p50,p90,p95,p99,999|stddev|estimate_distinct|first|last|oldest|newest|any|any_true|all_true|running_sum|running_count|overall_sum|overall_count|overall_min|overall_max|overall_avg|percent_of_total|running_percent|expand|array_expand|json_object_value|len|lower|upper|ltrim|rtrim|trim|substr|replace|isempty|isblank|string|pad_version|format|abs|ceiling|floor|sqrt|exp|ln|log|pow|net_ip|net_ipv4|net_ipv6|net_ipsubnet|net_private|net_rfc1918|net_rfc4193|timebucket|querystart|queryend|queryspan|strftime|now|simpledateformat|strptime|simpledateparse|geo_ip_location|geo_ip_city|geo_ip_state|geo_ip_state_iso|geo_ip_country|geo_ip_country_iso|geo_ip_continent|geo_ip_continent_code|geo_point|geo_point_within_polygon|geo_distance|array_agg|array_agg_distinct|array_mean|array_sum|array_min|array_max|array_median|array_map|array_from_json|array_to_json|array_distinct|array_sort|array|extract_matches|extract_matches_matchcase|array_split|array_split_matchcase|array_slice|array_intersect|array_reduce|array_filter|array_zip|array_concat|array_set|array_get|array_contains|array_match_any|array_match_all|array_to_string)\b/g;

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
    }

  return code;
}
