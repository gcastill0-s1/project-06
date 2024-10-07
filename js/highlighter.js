const code = document.getElementById('highlightedCode');
const highlighted = highlightSyntax(code.innerHTML);
code.innerHTML = highlighted

function highlightSyntax(code) {
    const aggregationPattern = /\b(running_sum|running_count|overall_sum|overall_count|overall_min|overall_max|overall_avg|percent_of_total|running_percent)\b/g;
    const arrayPattern = /\b(array_agg|array_agg_distinct|array_mean|array_sum|array_min|array_max|array_median|array_map|array_from_json|array_to_json|array_distinct|array_sort|array|extract_matches|extract_matches_matchcase|array_split|array_split_matchcase|array_slice|array_intersect|array_reduce|array_filter|array_zip|array_concat|array_set|array_get|len|array_contains|array_match_any|array_match_all|array_to_string)\b/g;
    const expressionPattern = /\b(\/\/|columns|filter|group|join|let|limit|lookup|savelookup|parse|sort|transpose|union)\b/g;
    const geolocationPattern = /\b(geo_ip_location|geo_ip_city|geo_ip_state|geo_ip_state_iso|geo_ip_country|geo_ip_country_iso|geo_ip_continent|geo_ip_continent_code|geo_point|geo_point_within_polygon|geo_distance)\b/g;
    const groupingPattern = /\b(count|string|sum|avg|min|min_by|max|max_by|median|pct|p10,p50,p90,p95,p99,999|stddev|estimate_distinct|first|last|oldest|newest|any|any_true|all_true)\b/g;
    const jsonPattern = /\b(expand|array_expand|json_object_value)\b/g;
    const networkingPattern = /\b(net_ip|net_ipv4|net_ipv6|net_ipsubnet|net_private|net_rfc1918|net_rfc4193)\b/g;
    const numberPattern = /\b(abs|ceiling|floor|min|max|sqrt|exp|ln|log|pow|sca:bytesToCharge)\b/g;
    const operatorPattern = /(\(|\)|\||\+|\-|\*|\/|%|\-x|<|<=|>|>=|=|==|!=|&&|\|\||!)/g;
    const logicPattern = /(by|from|AND|OR|NOT|\?:|contains|matchcase|matches)/g;
    const stringPattern = /\b(len|lower|upper|ltrim|rtrim|trim|substr|replace|isempty|isblank|string|pad_version|format)\b/g;
    const timePattern = /\b(timebucket|querystart|queryend|queryspan|strftime|now|simpledateformat|strptime|simpledateparse)\b/g;

    const generalStringPattern = /(['"`])(\\?.)*?\1/g;  // General string pattern
    const numberLiteralPattern = /\b\d+\b/g;  // Numbers 
    const commentPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;  // Comments

    return code
        .replace(operatorPattern,      '<span class="operator">$&</span>')
        .replace(logicPattern,         '<span class="logic">$&</span>')
        // .replace(generalStringPattern, '<span class="string">$&</span>')    
        .replace(aggregationPattern,   '<span class="aggregation">$&</span>')
        .replace(arrayPattern,         '<span class="array">$&</span>')
        .replace(expressionPattern,    '<span class="expression">$&</span>')
        .replace(commentPattern,       '<span class="comment">$&</span>')
        .replace(geolocationPattern,   '<span class="geolocation">$&</span>')
        .replace(groupingPattern,      '<span class="grouping">$&</span>')
        .replace(jsonPattern,          '<span class="json">$&</span>')
        .replace(networkingPattern,    '<span class="network">$&</span>')
        .replace(numberPattern,        '<span class="numeric">$&</span>')
        .replace(stringPattern,        '<span class="stringFunc">$&</span>')
        .replace(timePattern,          '<span class="time">$&</span>')
        .replace(numberLiteralPattern, '<span class="number">$&</span>');
}

const fileName = "pqhighlighter.png"
const section = document.getElementById("pqhighlighter-border")
const options = {"backgroundColor": null}

// html2canvas(section, options).then(canvas => {
//     canvas.toBlob((blob)=> {
//       saveAs(blob, fileName)
//     })
// })
