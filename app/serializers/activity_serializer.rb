class ActivitySerializer <ActiveModel::Serializer
    attributes :id, :name, :description
    has_many :item_categories, serializer: ItemCategorySerializer
end