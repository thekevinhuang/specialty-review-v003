# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (User has_many Reviews) 
- [x] Include at least one belongs_to relationship (ItemCategory belongs_to Activity)
- [x] Include at least one has_many through relationship (ItemModel has many Characteristics through ItemModelCharacteristics)
- [x] The "through" part of the has_many through includes at least one user submittable attribute (ItemModelCharacteristics have many Ratings of their own. ItemModelCharacteristics can return the average rating of their children.)
- [x] Include reasonable validations for simple model objects (User, Activities, ItemCategories, ItemModels, Ratings, Characteristic)
- [x] Include a class level ActiveRecord scope method (ItemModelCharacteristic.sort_by_param((item_model: :item_model, sort_type: :sort_type) can be sorted by count of reviews or average review with url like "item_models/3?sort=review" or "item_models/3?sort=count")
- [x] Include signup (Created my own form)
- [x] Include login (Created my own form)
- [x] Include logout (Created my own form)
- [x] Include third party signup/login (OmniAuth with Google Authentication)
- [x] Include nested resource show or index (activities/3/item_categories/3)
- [x] Include nested resource "new" form (item_categories/4/item_models/new)
- [x] Include form display of validation errors (included in the layout)

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [x] Views use partials if appropriate