<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function getTree(array $data){
        $tree = [];
        foreach ($data as $id=>&$node) {
            if (!$node['parent_id']){
                $tree[$id] = &$node;
            } else {
                if ($node['language_id'] === 1) {
                    $data[$node['parent_id']]['children'][$id] = &$node;
                }
            }
        }
        return $tree;
    }

    public function getMenuHtml($tree, $tab = ''){
        $str = '';
        foreach($tree as $id => $category){
            $str .= $this->catToTemplate($category, $tab, $id);
        }
        return $str;
    }

    public function catToTemplate($category, $tab, $id){
        ob_start();
        require $this->tpl;
        return ob_get_clean();
    }

    public function getMenuItems() {
        $users = DB::table('category')
            ->join('category_description','category.id','=','category_description.category_id')
            ->select('category.id','category.parent_id','category.slug','category_description.category_id','category_description.language_id','category_description.title')
            ->get();

        $array = json_decode(json_encode($users), true);
        return response()->json(self::getTree($array));
    }

}
