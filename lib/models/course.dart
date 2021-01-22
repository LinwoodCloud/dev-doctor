import 'package:dev_doctor/models/server.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:yaml/yaml.dart';
import 'part.dart';

@immutable
class Course {
  final CoursesServer server;
  final String slug;
  final String name;
  final String description;
  final String icon;
  final String author;
  final bool installed;
  final String body;
  final String lang;
  final List<String> parts;

  Course(
      {this.slug,
      this.name,
      this.description,
      this.icon,
      this.author,
      this.installed,
      this.body,
      this.lang,
      this.parts,
      this.server});
  Course.fromJson(Map<String, dynamic> json)
      : server = json['server'],
        slug = json['slug'],
        name = json['name'],
        description = json['description'],
        icon = json['icon'],
        author = json['author'],
        body = json['body'],
        installed = json['installed'],
        lang = json['lang'],
        parts = json['parts'];
  Future<List<Part>> fetchParts() async =>
      Future.wait(parts.asMap().map((index, value) => MapEntry(index, fetchPart(index))).values);

  Future<Part> fetchPart(int index) async {
    var part = parts[index];
    var response = await http.post("${server.url}/$slug/$part/config.yml");
    var data = loadYaml(response.body);
    data['course'] = this;
    data['slug'] = part;
    return Part.fromJson(data);
  }
}