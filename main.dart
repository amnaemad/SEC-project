import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io';


void main() {
  runApp(MyApp());
}

class Article {
  final String title;
  final String content;

  Article(this.title, this.content);
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Article Submission App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ArticleSubmissionScreen(),
    );
  }
}

class ArticleSubmissionScreen extends StatefulWidget {
  @override
  _ArticleSubmissionScreenState createState() => _ArticleSubmissionScreenState();
}

class _ArticleSubmissionScreenState extends State<ArticleSubmissionScreen> {
  final TextEditingController _articleTitleController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  List<Article> _articleList = [];

  @override
  void initState() {
    super.initState();
    _loadArticles();
  }

  _loadArticles() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String> articleStrings = prefs.getStringList('articles') ?? [];
    _articleList = articleStrings.map((articleString) {
      Map<String, dynamic> articleMap = json.decode(articleString);
      return Article(articleMap['title'], articleMap['content']);
    }).toList();
    setState(() {});
  }

  _saveArticle(Article article) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String> articleStrings = prefs.getStringList('articles') ?? [];
    articleStrings.add(json.encode({'title': article.title, 'content': article.content}));
    prefs.setStringList('articles', articleStrings);
  }

  _deleteArticle(int index) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String> articleStrings = prefs.getStringList('articles') ?? [];
    articleStrings.removeAt(index);
    prefs.setStringList('articles', articleStrings);
    _loadArticles();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Article Submission Module'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              TextFormField(
                controller: _articleTitleController,
                decoration: InputDecoration(labelText: 'Article Title'),
                validator: (value) {
                  if (value?.isEmpty ?? true) {
                    return 'Please enter a title';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState?.validate() ?? false) {
                    FilePickerResult? result = await FilePicker.platform.pickFiles(
                      type: FileType.custom,
                      allowedExtensions: ['txt', 'pdf'],
                    );

                    if (result != null) {
                      String content = await File(result.files.single.path!).readAsString();

                      Article article = Article(_articleTitleController.text, content);
                      _saveArticle(article);
                      _articleTitleController.clear();
                      _loadArticles();
                    }
                  }
                },
                child: Text('Submit Article'),
              ),
              SizedBox(height: 16),
              Expanded(
                child: ListView.builder(
                  itemCount: _articleList.length,
                  itemBuilder: (context, index) {
                    Article article = _articleList[index];
                    return ListTile(
                      title: Text(article.title),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ArticleDisplayScreen(article),
                          ),
                        );
                      },
                      trailing: IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () => _deleteArticle(index),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ArticleDisplayScreen extends StatelessWidget {
  final Article article;

  ArticleDisplayScreen(this.article);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Article Display'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              article.title,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text(article.content),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Go Back'),
            ),
          ],
        ),
      ),
    );
  }
}
