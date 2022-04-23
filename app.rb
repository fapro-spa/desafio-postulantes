require 'csv'
require 'json'
require 'pp'

#url = 'https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.csv'

#response = RestClient.get url
#resul = JSON.parse response.to_str


csv_options = {
  headers: true, converters: [:numeric]
}

results = []

CSV.foreach('1047-nomina_inst_financieras-1714.csv', csv_options) do |row|
  record = Hash[row]
  results << record
end

pp results

File.open("s.json","w") do |f|
  f.write(results.to_json)
end
