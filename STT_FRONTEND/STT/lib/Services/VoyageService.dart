import 'dart:convert';
import 'package:http/http.dart' as http;


class VoyageService {
  static const String baseUrl = 'http://localhost:3800/api/voyages'; // Remplacez l'URL par l'URL de votre serveur


  static Future<List<dynamic>> getVoyages() async {
    final response = await http.get(Uri.parse('$baseUrl/getVoyages'));
    if (response.statusCode == 200) {
      return json.decode(response.body)['result'];
    } else {
      throw Exception('Failed to load voyages');
    }
  }

  static Future<dynamic> getVoyage(String voyageId) async {
    final response = await http.get(Uri.parse('$baseUrl/getVoyage/$voyageId'));
    if (response.statusCode == 200) {
      return json.decode(response.body)['result'];
    } else {
      throw Exception('Failed to load voyage');
    }
  }

  static Future<void> createVoyage(Map<String, dynamic> voyageData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/createVoyage'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(voyageData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to create voyage');
    }
  }

  static Future<void> updateVoyage(String voyageId,
      Map<String, dynamic> voyageData) async {
    final response = await http.put(
      Uri.parse('$baseUrl/updateVoyage/$voyageId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(voyageData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update voyage');
    }
  }


  static Future<String> getVoyageByVilleDateTime(
      Map<String, String> filterParams) async {
    final response = await http.post(
      Uri.parse('$baseUrl/getVoyageByVilleDateTime'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(filterParams),
    );
    if (response.statusCode == 200) {
      final dynamic data = json.decode(response.body)['voyageId']; // Modifier ici
      return data;
    } else {
      throw Exception('Failed to get voyage by ville and datetime');
    }
  }

}