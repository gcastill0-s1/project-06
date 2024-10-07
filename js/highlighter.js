const code = document.getElementById("highlightedCode");
const highlighted = highlightSyntax(code.innerHTML);
code.innerHTML = highlighted;

// Function to escape HTML characters
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
  return code
    // .replace(stringPattern, '<span class="string">$&</span>')
    .replace(operatorPattern, '<span class="operator">$&</span>')
    .replace(commentPattern, '<span class="comment">$&</span>')
    .replace(expressionPattern, '<span class="expression">$&</span>')
    .replace(functionPattern, '<span class="function">$&</span>')
    .replace(numberPattern, '<span class="number">$&</span>');
}

const fileName = "pqhighlighter.png";
const section = document.getElementById("pqhighlighter-border");
const options = { backgroundColor: null };